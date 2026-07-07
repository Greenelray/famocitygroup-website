"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function PremiumHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(4.2, 3.2, 7.2);
    camera.lookAt(0, 0.5, 0);

    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf2d37a, 2.4);
    keyLight.position.set(2, 5, 4);
    scene.add(keyLight);

    const blueMaterial = new THREE.MeshStandardMaterial({
      color: 0x123a67,
      roughness: 0.42,
      metalness: 0.22
    });
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8a951,
      roughness: 0.28,
      metalness: 0.35
    });
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0xdde9f6,
      roughness: 0.12,
      metalness: 0.08,
      transparent: true,
      opacity: 0.66
    });
    const greenMaterial = new THREE.MeshStandardMaterial({
      color: 0x3f8f5d,
      roughness: 0.6,
      metalness: 0.04
    });

    const group = new THREE.Group();
    scene.add(group);

    const base = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.12, 3.2), greenMaterial);
    base.position.y = -0.08;
    group.add(base);

    const towerGeometry = new THREE.BoxGeometry(0.68, 1, 0.68);
    for (let index = 0; index < 7; index += 1) {
      const tower = new THREE.Mesh(towerGeometry, index % 2 ? blueMaterial : glassMaterial);
      const row = index % 3;
      const col = Math.floor(index / 3);
      tower.scale.y = 0.9 + index * 0.13;
      tower.position.set(-1.45 + col * 1.05, tower.scale.y * 0.5, -0.82 + row * 0.78);
      group.add(tower);
    }

    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.78, 0.54, 4), goldMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(1.58, 1.18, 0.75);
    group.add(roof);

    const solarPanel = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.05, 1.1), blueMaterial);
    solarPanel.rotation.set(-0.5, 0.25, 0.12);
    solarPanel.position.set(1.55, 0.82, -0.95);
    group.add(solarPanel);

    const pathMaterial = new THREE.MeshStandardMaterial({
      color: 0xd7c078,
      roughness: 0.5,
      metalness: 0.12
    });
    const path = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.04, 3.3), pathMaterial);
    path.position.set(-2.15, 0.02, 0);
    group.add(path);

    const rings: THREE.Mesh[] = [];
    for (let index = 0; index < 3; index += 1) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.65 + index * 0.42, 0.012, 8, 72),
        new THREE.MeshBasicMaterial({ color: index === 1 ? 0xc8a951 : 0x9db8d6, transparent: true, opacity: 0.34 })
      );
      ring.rotation.x = Math.PI / 2.2;
      ring.position.y = 0.03 + index * 0.02;
      rings.push(ring);
      group.add(ring);
    }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    let frame = 0;
    let animationFrame = 0;
    const animate = () => {
      frame += 0.008;
      group.rotation.y = Math.sin(frame) * 0.22 - 0.28;
      group.rotation.x = Math.sin(frame * 0.7) * 0.035;
      rings.forEach((ring, index) => {
        ring.rotation.z += 0.0018 + index * 0.0007;
      });
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70 [mask-image:linear-gradient(90deg,transparent_0%,black_36%,black_100%)]"
    />
  );
}
