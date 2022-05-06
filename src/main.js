import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragment from './shaders/fragment.glsl'
import fragment2 from './shaders/fragment2.glsl'
import fragment3 from './shaders/fragment3.glsl'
import vertex from './shaders/vertex.glsl'
import vertex2 from './shaders/vertex2.glsl'
import vertex3 from './shaders/vertex3.glsl'


import testTexturE from './assets/1.png';
import testTexturE2 from './assets/4.png';
import testTexturE3 from './assets/2.png';







export default class Sketch{
	constructor(options){


		

		this.container = options.domElement;
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;

		this.camera = new THREE.PerspectiveCamera( 70, this.width/this.height, 0.01, 10 );
		this.camera.position.z = 2;
        this.camera.position.y = -1.7;

		
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0x000000 );

		this.renderer = new THREE.WebGLRenderer( { 
      		antialias: true,
      		alpha: true
     } );
		this.renderer.setPixelRatio(2);
		this.container.appendChild(this.renderer.domElement);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		
		this.time = 0;
        this.clock = new THREE.Clock();
        
		this.resize();
		this.addObjects();
		this.render();
		this.setupResize();
        this.addLights();
    
	}

    addLights(){
        this.scene.add(new THREE.AmbientLight(0xffffff,0.8))

        let dirLight = new THREE.DirectionalLight(0xffffff,0)
        dirLight.position.set(-30,-10,-10)
        // this.scene.add(dirLight)

    }


    

	resize(){
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize( this.width, this.height);
		this.camera.aspect = this.width/this.height;
		this.camera.updateProjectionMatrix();
	}

	setupResize(){
		window.addEventListener('resize',this.resize.bind(this));
	}


	addObjects(){
    this.geometry4 = new THREE.SphereBufferGeometry(2.5,32,32);

    // this.geometry4 = new THREE.CylinderGeometry(15, 0, 0.8, 60, 60, true,);
    this.geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 3, 60, true);
    this.geometry2 = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 6, 60, true);
    this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.3, 60, 60, true);

    // this.material = new THREE.MeshNormalMaterial;


    this.material = new THREE.ShaderMaterial({
		uniforms: {
        uTime: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        uProgress: { value: 1.0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexturE)},
      },
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment
    });

    this.material2 = new THREE.ShaderMaterial({
		uniforms: {
        uTime: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        uProgress: { value: 1.0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexturE2)},
      },
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.material3 = new THREE.ShaderMaterial({
		uniforms: {
        uTime: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        uProgress: { value: 1.0 },
        uTexture: { value: new THREE.TextureLoader().load(testTexturE3)},
      },
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.material4 = new THREE.ShaderMaterial({
		uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
      },
      transparent: true,
      side: THREE.DoubleSide,
      vertexShader: vertex3,
      fragmentShader: fragment3,
    });



		this.mesh = new THREE.Mesh( this.geometry, this.material);
        this.mesh2 = new THREE.Mesh( this.geometry2, this.material2);
        this.mesh3 = new THREE.Mesh( this.geometry3, this.material3);
        this.mesh4 = new THREE.Mesh( this.geometry4, this.material4);
		this.scene.add( this.mesh);
        this.scene.add( this.mesh2);
        this.scene.add( this.mesh3);
        this.scene.add( this.mesh4);
	}



	render(){
		

		this.time += 0.01;
        this.material.uniforms.uTime.value = this.clock.getElapsedTime();
        this.material2.uniforms.uTime.value = this.clock.getElapsedTime();
        this.material3.uniforms.uTime.value = this.clock.getElapsedTime();
        this.material4.uniforms.time.value = this.time;
        
		this.mesh.position.y = 1;
        this.mesh.rotation.x = this.time * 2;
        this.mesh.rotation.y = this.time * 2;

        this.mesh2.rotation.x = this.clock.getElapsedTime() * 0.5;
        
        this.mesh3.position.y = -0.7;
        this.mesh3.rotation.x = this.time * 3;
        this.mesh3.rotation.y = this.time * 3;

        this.mesh4.scale.set(2,2,2);
        this.mesh4.position.z = -2;
        this.mesh4.position.y = 1.3;
        this.mesh4.rotation.x = 1.5;

		// this.mesh.rotation.x = this.time * 0.5
		// this.mesh.rotation.x = 10;
		// this.mesh.rotation.y = this.time / 1000;
	
		this.renderer.render( this.scene, this.camera );
		requestAnimationFrame(this.render.bind(this))
	}
}

new Sketch({
	domElement: document.getElementById('container')
});



