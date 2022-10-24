import react, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Image, FlatList, ScrollView, SafeAreaView, Platform ,TouchableOpacity } from 'react-native';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker'

const numColumns = 1;

//****************************************************************** */

const images = [
  {
    name: "Carnes",
    img: require("../../../assets/sobremesa.jpg"),
  },

  {
    name: "italiana",
    img: require("../../../assets/sobremesa.jpg"),
  },

  {
    name: "brasileira",
    img: require("../../../assets/sobremesa.jpg"),
  },

  {
    name: "alema",
    img: require("../../../assets/sobremesa.jpg"),
  },
];

//****************************************************************** */

import { db } from '../../config/firebaseconfig';

//****************************************************************** */

export default function Sobremesas() {

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sobremesas, setSobremesas] = useState("");
  const [visivel, setVisivel] = useState(false);
  const [visible, setVisible] = useState(false);

  const dataCollectionRef = collection(db, "sobremesas")

  //ADD CRUD

  async function addReceita() {
    const receita = await addDoc(dataCollectionRef, {
      nome,
      descricao,
    });
    console.log(receita);
  }

  //Upload Image

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status != 'granted') {
          alert('Teste')
        }
      }
    })();
  }, []);

  const imagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const timeimg = new Date().getTime();
      const storage = getStorage();
      const refs = ref(storage, `Sobremesas/${timeimg}`);

      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(refs, bytes)
    }
  };

  //GET CRUD

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(dataCollectionRef)
      setSobremesas((data.docs.map((doc, item) => ({ ...doc.data(), id: doc.id, image: images[item] }))));
    };
    getData();
  }, [])

  return (
    <>
      <View style={styles.container}>
        <ScrollView styles={{ marginTop: 200 }}>
          <FlatList
            data={sobremesas}
            numColumns={numColumns}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardIMG}>
                  <TouchableOpacity style={{ alignItems: 'center', justifyContent: "center" }} onPress={() => { setVisivel(true) }}>
                    <Text style={styles.description}>{item.nome}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          >
          </FlatList>

          <View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={visivel}
              style={styles.modal}
            >
              {/* <Text>Salve</Text> */}
              {/* <Text style={styles.description}>{item.nome}</Text>
                <Text style={styles.description}>{item.descricao}</Text> */}
              <FlatList
                data={sobremesas}
                numColumns={numColumns}
                keyExtractor={item => item.nome}
                renderItem={({ item }) => (
                  <View style={styles.modal}>
                    <TouchableOpacity
                      style={styles.botao12}
                      onPress={() => {
                        setVisivel(false);
                      }}>
                      <Text style={styles.tex}>x</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>{item.nome}</Text>
                    <Text style={styles.description}>{item.descricao}</Text>
                  </View>
                )}
              >

              </FlatList>



            </Modal>

          </View>

        </ScrollView>
        <TouchableOpacity style={styles.buttonNew} onPress={() => { setVisible(true) }}>
          <Text style={{ color: '#fffff', fontWeight: 'bold', fontSize: 35 }}>+</Text>
        </TouchableOpacity>
        <View>
          <Modal
            style={styles.modal}
            animationType="slide"
            transparent={true}
            visible={visible}
          >
            <View style={styles.modal}>
              <TouchableOpacity style={styles.botao12} onPress={() => { setVisible(false) }}>
                <Text style={styles.tex}>X</Text>
              </TouchableOpacity>
              <input
                type="text"
                placeholder='Nome da Receita'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={styles.inputt}
              />
              <input
                type="text"
                placeholder='Descrição da Receita'
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                style={styles.inputt}
              />
              <TouchableOpacity onPress={imagePick} style={styles.select}>
                <Text style={styles.texSelec}>Selecionar</Text>
              </TouchableOpacity>
              <button onClick={addReceita} style={styles.add}>Adicionar</button>
            </View>

          </Modal>
        </View>
      </View>

    </>

  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',

  },
  card: {
    flexDirection: 'row',

  },
  cardIMG: {
    width: 390,
    height: 250,
    marginTop: 25,
    paddingBottom: 35,
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    cursor: 'pointer'

  },
  imgCard: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    alignItems: 'center',

  },
  description: {
    fontSize: 20,
    height: 25,
    marginBottom: '5%',
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  modal: {
    padding: 20,
    margin: 20,
    backgroundColor: '#D4D4D4',
    borderRadius: 20,
    elevation: 10,
    height: 450,
  },
  botao12: {
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 100,
    width: 35,
    height: 35,
    alignSelf: 'flex-end',
  },
  tex: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 22
  },

  buttonNew: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 30,
    left: 20,
    backgroundColor: "#EB5656",
    borderRadius: 50,
    borderWidth:2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputt:{
    borderRadius: 20,
    width: '75%',
    height: 30,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: 15
  },
  add:{
    borderRadius: 20,
    width: '75%',
    height: 30,
    marginBottom: 10,
    alignSelf: 'center',
    marginTop: '5%',
    fontSize: 20
  },
  select:{
    textAlign: 'center',
    marginBottom: 10,
    marginTop: '15%',
  },
  texSelec:{
    fontSize: 20
  }

});
