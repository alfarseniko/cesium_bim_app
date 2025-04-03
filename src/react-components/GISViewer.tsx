// The URL on your server where CesiumJS's static files are hosted.
const win = window as any;
win.CESIUM_BASE_URL = "/Cesium";

import * as Cesium from "cesium";
import {
  Cartesian3,
  Ion,
  Math as CesiumMath,
  Terrain,
  Color,
  Viewer,
  PerspectiveFrustum,
  createOsmBuildingsAsync,
  SceneMode,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as THREE from "three";
import * as OBC from "openbim-components";
import { CesiumCamera } from "../bim-compnents/cesium-camera";
import * as React from "react";
import { AuthError, signOut } from "firebase/auth";
import { auth } from "../firebase";

export function GISViewer() {
  async function setViewer() {
    // Init CESIUM

    // Your access token can be found at: https://ion.cesium.com/tokens.
    // This is the default access token from your ion account
    // @ts-ignore
    const cesiumToken = import.meta.env.VITE_CESIUM_TOKEN;
    Ion.defaultAccessToken = cesiumToken;

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Viewer("cesiumContainer", {
      terrain: Terrain.fromWorldTerrain(),
      useDefaultRenderLoop: false,
    });

    // Add Cesium OSM Buildings, a global 3D buildings layer.
    const buildingTileset = await createOsmBuildingsAsync();
    viewer.scene.primitives.add(buildingTileset);

    // boundaries in WGS84 to help with syncing the renderers
    const minWGS84 = [-5.996332484651805, 37.388948626088755];
    const maxWGS84 = [-5.994808990075886, 37.38832634224693];

    const offset = 0.002; // So that the target is centered in the screen
    const center = Cartesian3.fromDegrees(
      (minWGS84[0] + maxWGS84[0]) / 2,
      (minWGS84[1] + maxWGS84[1]) / 2 - offset,
      500
    );

    viewer.camera.flyTo({
      destination: center,
      orientation: {
        heading: CesiumMath.toRadians(0),
        pitch: CesiumMath.toRadians(-60),
        roll: CesiumMath.toRadians(0),
      },
      duration: 3,
    });

    // Init Components

    const ThreeContainer = document.getElementById(
      "ThreeContainer"
    ) as HTMLElement;
    const components = new OBC.Components();
    components.scene = new OBC.SimpleScene(components);
    components.renderer = new OBC.SimpleRenderer(components, ThreeContainer, {
      alpha: true,
    });
    components.camera = new CesiumCamera(components);
    components.raycaster = new OBC.SimpleRaycaster(components);
    components.init();

    const sceneComp = components.scene as OBC.SimpleScene;
    sceneComp.setup();

    const scene = sceneComp.get();
    scene.background = null;

    const camera = components.camera.get() as THREE.PerspectiveCamera;
    camera.fov = 45;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.near = 1;
    camera.far = 10 * 1000 * 1000;
    const renderer = components.renderer as OBC.SimpleRenderer;

    // Init 3D objects in both libraries

    //Cesium entity
    const entity = {
      name: "Polygon",
      polygon: {
        hierarchy: Cartesian3.fromDegreesArray([
          minWGS84[0],
          minWGS84[1],
          maxWGS84[0],
          minWGS84[1],
          maxWGS84[0],
          maxWGS84[1],
          minWGS84[0],
          maxWGS84[1],
        ]),
        material: Color.RED.withAlpha(0.2),
      },
    };

    const Polygon = viewer.entities.add(entity);

    // Geometry
    const _3Dobjects: Object3D[] = []; //Could be any Three.js object mesh

    type Object3D = {
      threeMesh: THREE.Object3D; //Three.js 3DObject.mesh
      minWGS84: number[]; //location bounding box
      maxWGS84: number[];
    };

    // // Load IFC

    // const ifcLoader = new OBC.FragmentIfcLoader(components);
    // const file = await fetch("/small.ifc");
    // const data = await file.arrayBuffer();
    // const buffer = new Uint8Array(data);
    // const model = await ifcLoader.load(buffer, "example");
    // for (const child of model.children) {
    //   child.rotation.x = Math.PI / 2;
    //   child.position.z += 65;
    // }
    // scene.add(model);

    // window.onkeydown = (event) => {
    //   if (event.code === "KeyZ") {
    //     for (const child of model.children) {
    //       child.position.z += 10;
    //     }
    //   } else if (event.code === "KeyY") {
    //     for (const child of model.children) {
    //       child.position.y += 10;
    //     }
    //   } else if (event.code === "KeyX") {
    //     for (const child of model.children) {
    //       child.position.x += 10;
    //     }
    //   }
    //   model.updateMatrix();
    //   model.updateWorldMatrix(true, true);
    // };

    //Assign Three.js object mesh to our object array
    // const ifcObject: Object3D = {
    //   threeMesh: model,
    //   minWGS84: minWGS84,
    //   maxWGS84: maxWGS84,
    // };

    // _3Dobjects.push(ifcObject);

    // Animate

    renderer.onBeforeUpdate.add(() => {
      viewer.render();

      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;

      //  register Three.js scene with Cesium
      const perspectiveFrustum = viewer.camera.frustum as PerspectiveFrustum;
      if (!perspectiveFrustum.fovy === undefined) return;
      camera.fov = CesiumMath.toDegrees(perspectiveFrustum.fovy); // ThreeJS FOV is vertical
      camera.updateProjectionMatrix();

      var cartToVec = function (cart: any) {
        return new THREE.Vector3(cart.x, cart.y, cart.z);
      };

      // Configure Three.js meshes to stand against globe center position up direction
      for (const id in _3Dobjects) {
        const minWGS84 = _3Dobjects[id].minWGS84;
        const maxWGS84 = _3Dobjects[id].maxWGS84;
        // convert lat/long center position to Cartesian3
        const center = Cartesian3.fromDegrees(
          (minWGS84[0] + maxWGS84[0]) / 2,
          (minWGS84[1] + maxWGS84[1]) / 2
        );

        // get forward direction for orienting model
        const centerHigh = Cartesian3.fromDegrees(
          (minWGS84[0] + maxWGS84[0]) / 2,
          (minWGS84[1] + maxWGS84[1]) / 2,
          1
        );
        const centerHighVec = new THREE.Vector3(
          centerHigh.x,
          centerHigh.y,
          centerHigh.z
        );

        // use direction from bottom left to top left as up-vector
        const bottomLeft = cartToVec(
          Cartesian3.fromDegrees(minWGS84[0], minWGS84[1])
        );
        const topLeft = cartToVec(
          Cartesian3.fromDegrees(minWGS84[0], maxWGS84[1])
        );
        const latDir = new THREE.Vector3()
          .subVectors(bottomLeft, topLeft)
          .normalize();

        // configure entity position and orientation
        _3Dobjects[id].threeMesh.position.set(center.x, center.y, center.z);
        _3Dobjects[id].threeMesh.lookAt(centerHighVec);
        _3Dobjects[id].threeMesh.up.copy(latDir);
      }

      // Clone Cesium Camera projection position so the
      // Three.js Object will appear to be at the same place as above the Cesium Globe
      camera.matrixAutoUpdate = false;
      var cvm = viewer.camera.viewMatrix;
      var civm = viewer.camera.inverseViewMatrix;

      camera.matrixWorld.set(
        civm[0],
        civm[4],
        civm[8],
        civm[12],
        civm[1],
        civm[5],
        civm[9],
        civm[13],
        civm[2],
        civm[6],
        civm[10],
        civm[14],
        civm[3],
        civm[7],
        civm[11],
        civm[15]
      );

      camera.matrixWorldInverse.set(
        cvm[0],
        cvm[4],
        cvm[8],
        cvm[12],
        cvm[1],
        cvm[5],
        cvm[9],
        cvm[13],
        cvm[2],
        cvm[6],
        cvm[10],
        cvm[14],
        cvm[3],
        cvm[7],
        cvm[11],
        cvm[15]
      );

      camera.updateProjectionMatrix();
    });
  }
  const handleSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      // The redirect will happen automatically due to the useEffect above
    } catch (error) {
      console.error("Sign out error:", error as AuthError);
    }
  };
  React.useEffect(() => {
    setViewer();
  }, []);
  return (
    <div id="viewer">
      <div id="cesiumContainer" className="viewer no-scrollbar"></div>
      <div id="ThreeContainer" className="untouchable viewer no-scrollbar">
        {" "}
        <button className="signout-button cta-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
}
