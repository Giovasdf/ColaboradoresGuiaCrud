<template>
    <div>
        <form @submit.prevent="addColaborador">
            <input v-model="nuevoColaborador" placeholder="Nuevo colaborador" />
            <button type="submit">Agregar</button>
        </form>
        <ul>
            <li v-for="colaborador in colaboradores" :key="colaborador.id">
                {{ colaborador.id }} - {{ colaborador.nombre }}
                <button @click="deleteColaborador(colaborador.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../../firebaseConfig.js';

export default {
    data() {
        return {
            nuevoColaborador: '',
            colaboradores: [],
            db: null,  
            colaboradoresRef: null 
        };
    },
    mounted() {
        this.db = getFirestore(firebaseApp);
        this.colaboradoresRef = collection(this.db, 'colaboradores');
        this.loadColaboradores();
    },
    methods: {
        // LISTAR COLABORADOR
        loadColaboradores() {
            onSnapshot(this.colaboradoresRef, (snapshot) => {
                this.colaboradores = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
            });
        },
        // AGREGAR COLABORADOR
        async addColaborador() {
            if (this.nuevoColaborador.trim() === '') return;

            try {
                await addDoc(this.colaboradoresRef, { nombre: this.nuevoColaborador });
                this.nuevoColaborador = '';  
            } catch (error) {
                console.error("Error agregando colaborador: ", error);
            }
        },
        // ELIMINAR COLABORADOR
        async deleteColaborador(colaboradorId) {
            try {
                const colaboradorRef = doc(this.db, 'colaboradores', colaboradorId);
                await deleteDoc(colaboradorRef);
            } catch (error) {
                console.error("Error eliminando colaborador: ", error);
            }
        }
    }
};
</script>

<style scoped>
</style>
