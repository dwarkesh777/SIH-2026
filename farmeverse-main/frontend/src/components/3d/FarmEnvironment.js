import * as THREE from 'three';

/**
 * Creates a rich, realistic 3D Farm Environment
 * Contains: dirt road, rutted tire tracks, crop rows, wooden fences, trees, and sunlight.
 */
export function createFarmEnvironment() {
  const farmGroup = new THREE.Group();

  // ── Materials ──
  const soilRoadMaterial = new THREE.MeshStandardMaterial({
    color: 0x664429, // Rich brown soil road
    roughness: 0.95,
    metalness: 0.05,
  });

  const tireTrackMaterial = new THREE.MeshStandardMaterial({
    color: 0x472f1c, // Darker compressed mud/dirt ruts
    roughness: 0.9,
    metalness: 0.05,
  });

  const grassFieldMaterial = new THREE.MeshStandardMaterial({
    color: 0x22543d, // Lush farm pasture green
    roughness: 0.85,
    metalness: 0.05,
  });

  const cropFoliageMaterial = new THREE.MeshStandardMaterial({
    color: 0x16a34a, // Vibrant crop green
    roughness: 0.6,
    metalness: 0.1,
  });

  const cropFoliageDarkMaterial = new THREE.MeshStandardMaterial({
    color: 0x15803d, // Deeper green for leaf contrast
    roughness: 0.7,
    metalness: 0.1,
  });

  const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x78350f, // Weathered timber fence
    roughness: 0.8,
    metalness: 0.05,
  });

  const treeFoliageMaterial = new THREE.MeshStandardMaterial({
    color: 0x15803d,
    roughness: 0.75,
    metalness: 0.05,
  });

  const treeTrunkMaterial = new THREE.MeshStandardMaterial({
    color: 0x451a03,
    roughness: 0.9,
    metalness: 0.05,
  });

  // ── 1. Main Ground (Fields) ──
  const fieldGeo = new THREE.PlaneGeometry(70, 35);
  const mainField = new THREE.Mesh(fieldGeo, grassFieldMaterial);
  mainField.rotation.x = -Math.PI / 2;
  mainField.position.y = -0.02;
  mainField.receiveShadow = true;
  farmGroup.add(mainField);

  // ── 2. Dirt Road (Runs along X axis) ──
  // Road width: 6.5 units, length: 70 units
  const roadGeo = new THREE.PlaneGeometry(70, 6.5);
  const road = new THREE.Mesh(roadGeo, soilRoadMaterial);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 0);
  road.receiveShadow = true;
  farmGroup.add(road);

  // Road edge dirt shoulders
  [-3.4, 3.4].forEach((zPos) => {
    const shoulderGeo = new THREE.PlaneGeometry(70, 1.2);
    const shoulder = new THREE.Mesh(shoulderGeo, tireTrackMaterial);
    shoulder.rotation.x = -Math.PI / 2;
    shoulder.position.set(0, 0.015, zPos);
    shoulder.receiveShadow = true;
    farmGroup.add(shoulder);
  });

  // Darker tire ruts along the road
  [-1.15, 1.15].forEach((zPos) => {
    const rutGeo = new THREE.PlaneGeometry(70, 0.85);
    const rut = new THREE.Mesh(rutGeo, tireTrackMaterial);
    rut.rotation.x = -Math.PI / 2;
    rut.position.set(0, 0.02, zPos);
    rut.receiveShadow = true;
    farmGroup.add(rut);
  });

  // Small pebbles and soil mounds scattered along road edges
  const pebbleGeo = new THREE.DodecahedronGeometry(0.08, 1);
  for (let i = 0; i < 45; i++) {
    const pebble = new THREE.Mesh(pebbleGeo, soilRoadMaterial);
    pebble.position.set(
      (Math.random() - 0.5) * 60,
      0.06,
      (Math.random() > 0.5 ? 1 : -1) * (1.8 + Math.random() * 1.5)
    );
    pebble.scale.set(0.6 + Math.random() * 0.8, 0.4 + Math.random() * 0.5, 0.6 + Math.random() * 0.8);
    farmGroup.add(pebble);
  }

  // ── 3. Agricultural Crop Rows ──
  // We place parallel crop rows north and south of the dirt road
  const cropClusterGeo = new THREE.ConeGeometry(0.35, 1.1, 5);
  const cropStalkGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 4);

  function createCropRow(zOffset, density = 40) {
    const rowGroup = new THREE.Group();
    for (let i = 0; i < density; i++) {
      const x = -30 + (i / density) * 60 + (Math.random() - 0.5) * 0.4;
      const z = zOffset + (Math.random() - 0.5) * 0.25;

      const stalk = new THREE.Mesh(cropStalkGeo, cropFoliageDarkMaterial);
      stalk.position.set(x, 0.4, z);
      rowGroup.add(stalk);

      const foliage = new THREE.Mesh(cropClusterGeo, cropFoliageMaterial);
      foliage.position.set(x, 0.95, z);
      foliage.rotation.y = Math.random() * Math.PI;
      foliage.scale.set(0.8 + Math.random() * 0.4, 0.9 + Math.random() * 0.3, 0.8 + Math.random() * 0.4);
      foliage.castShadow = true;
      rowGroup.add(foliage);
    }
    return rowGroup;
  }

  // Far north crop rows
  farmGroup.add(createCropRow(4.8, 35));
  farmGroup.add(createCropRow(6.5, 38));
  farmGroup.add(createCropRow(8.2, 40));

  // Near south crop rows (foreground edge)
  farmGroup.add(createCropRow(-4.8, 35));
  farmGroup.add(createCropRow(-6.5, 38));

  // ── 4. Wooden Fence Posts along Roadside ──
  const postGeo = new THREE.CylinderGeometry(0.07, 0.09, 1.4, 6);
  const railGeo = new THREE.BoxGeometry(3.6, 0.08, 0.08);

  for (let x = -28; x <= 28; x += 3.5) {
    // Post
    const post = new THREE.Mesh(postGeo, woodMaterial);
    post.position.set(x, 0.7, 4.2);
    post.rotation.y = Math.random() * 0.3;
    post.castShadow = true;
    farmGroup.add(post);

    // Cross rails
    if (x < 28) {
      const topRail = new THREE.Mesh(railGeo, woodMaterial);
      topRail.position.set(x + 1.75, 1.1, 4.2);
      farmGroup.add(topRail);

      const bottomRail = new THREE.Mesh(railGeo, woodMaterial);
      bottomRail.position.set(x + 1.75, 0.65, 4.2);
      farmGroup.add(bottomRail);
    }
  }

  // ── 5. Scenic Background Farm Trees ──
  function createTree(x, z, scale = 1) {
    const treeGroup = new THREE.Group();

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.25 * scale, 0.35 * scale, 2.5 * scale, 6);
    const trunk = new THREE.Mesh(trunkGeo, treeTrunkMaterial);
    trunk.position.set(0, 1.25 * scale, 0);
    trunk.castShadow = true;
    treeGroup.add(trunk);

    // Layered Foliage Canopies
    const c1Geo = new THREE.SphereGeometry(1.6 * scale, 7, 7);
    const c1 = new THREE.Mesh(c1Geo, treeFoliageMaterial);
    c1.position.set(0, 3.2 * scale, 0);
    c1.castShadow = true;
    treeGroup.add(c1);

    const c2Geo = new THREE.SphereGeometry(1.2 * scale, 6, 6);
    const c2 = new THREE.Mesh(c2Geo, cropFoliageDarkMaterial);
    c2.position.set(0.4 * scale, 4.2 * scale, 0.2 * scale);
    c2.castShadow = true;
    treeGroup.add(c2);

    treeGroup.position.set(x, 0, z);
    return treeGroup;
  }

  // Clustered farm trees along back horizon
  farmGroup.add(createTree(-22, 11, 1.2));
  farmGroup.add(createTree(-14, 12.5, 1.5));
  farmGroup.add(createTree(-6, 11.5, 1.1));
  farmGroup.add(createTree(4, 12, 1.4));
  farmGroup.add(createTree(15, 11, 1.3));
  farmGroup.add(createTree(23, 12.5, 1.6));

  // ── 6. Golden Atmosphere Dust & Pollen Motes ──
  const moteCount = 60;
  const moteGeo = new THREE.BufferGeometry();
  const motePos = new Float32Array(moteCount * 3);

  for (let i = 0; i < moteCount; i++) {
    motePos[i * 3] = (Math.random() - 0.5) * 50;
    motePos[i * 3 + 1] = 0.5 + Math.random() * 5.0;
    motePos[i * 3 + 2] = (Math.random() - 0.5) * 16;
  }
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));

  const moteMat = new THREE.PointsMaterial({
    color: 0xfef08a,
    size: 0.12,
    transparent: true,
    opacity: 0.6,
    depthWrite: false,
  });
  const motes = new THREE.Points(moteGeo, moteMat);
  farmGroup.add(motes);

  // ── Environment Update Loop ──
  function update(delta) {
    const pos = motes.geometry.attributes.position.array;
    for (let i = 0; i < moteCount; i++) {
      pos[i * 3 + 1] += Math.sin(delta * 2 + i) * 0.006;
      pos[i * 3] += Math.cos(delta * 1.5 + i) * 0.005;
    }
    motes.geometry.attributes.position.needsUpdate = true;
  }

  return {
    group: farmGroup,
    update,
  };
}
