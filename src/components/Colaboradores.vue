<template>
    <div>
        <h1>Colaboradores</h1>
        <form @submit.prevent="addColaborador">
            <input v-model="nuevoColaborador" placeholder="Nuevo colaborador" />
            <button type="submit">Agregar</button>
        </form>
        
        <ul>
            <li v-for="colaborador in colaboradores" :key="colaborador.id">
                <span v-if="!colaborador.editing">{{ colaborador.nombre }}</span>
                <input 
                    v-else 
                    v-model="colaborador.nombreEditado" 
                    @keyup.enter="updateColaborador(colaborador)" 
                    @blur="cancelEdit(colaborador)"
                />
                <button @click="colaborador.editing = !colaborador.editing">
                    {{ colaborador.editing ? 'Cancelar' : 'Editar' }}
                </button>
                <button @click="deleteColaborador(colaborador.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<script>
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import firebaseApp from '../../firebaseConfig.js';

export default {
    data() {
        return {
            nuevoColaborador: '',
            colaboradores: []
        };
    },
    mounted() {
        this.loadColaboradores();
    },
    methods: {
        loadColaboradores() {
            const db = getFirestore(firebaseApp);
            const colaboradoresRef = collection(db, 'colaboradores');
            onSnapshot(colaboradoresRef, (snapshot) => {
                this.colaboradores = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    editing: false, 
                    nombreEditado: doc.data().nombre 
                }));
            });
        },
        async addColaborador() {
            if (this.nuevoColaborador.trim() === '') return;

            try {
                const db = getFirestore(firebaseApp);
                const colaboradoresRef = collection(db, 'colaboradores');
                await addDoc(colaboradoresRef, { nombre: this.nuevoColaborador });
                this.nuevoColaborador = '';  
            } catch (error) {
                console.error("Error agregando colaborador: ", error);
            }
        },
        async deleteColaborador(colaboradorId) {
            try {
                const db = getFirestore(firebaseApp);
                const colaboradorRef = doc(db, 'colaboradores', colaboradorId);
                await deleteDoc(colaboradorRef);
            } catch (error) {
                console.error("Error eliminando colaborador: ", error);
            }
        },
        async updateColaborador(colaborador) {
            if (!colaborador.nombreEditado.trim()) {
                colaborador.editing = false; 
                return;
            }

            try {
                const db = getFirestore(firebaseApp);
                const colaboradorRef = doc(db, 'colaboradores', colaborador.id);
                await updateDoc(colaboradorRef, { nombre: colaborador.nombreEditado });
                colaborador.editing = false; 
                colaborador.nombre = colaborador.nombreEditado; 
            } catch (error) {
                console.error("Error actualizando colaborador: ", error);
            }
        },
        cancelEdit(colaborador) {
            colaborador.editing = false; 
            colaborador.nombreEditado = colaborador.nombre; 
        }
    }
};
</script>

<style scoped>
</style>
