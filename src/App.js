import React, { useState, useEffect } from "react";
import { getRepositories, addLike } from './services/RepositoryApi'
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories().then((response) => setRepositories([...response.data]));
  }, [])
  async function handleLikeRepository(id) {
    addLike(id).then((response) => {
      const { likes } = response.data;
      const new_reposiries_data = repositories.reduce((acc, repo) => {
        if (repo.id === id) repo.likes = likes;
        acc.push(repo);
        return acc;
      }, []);
      setRepositories([...new_reposiries_data]);
    })
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>Repository 1</Text>

          <View style={styles.techsContainer}>
            <Text style={styles.tech}>
              ReactJS
            </Text>
            <Text style={styles.tech}>
              Node.js
            </Text>
          </View>
          {repositories.map((repository, index) =>
            <View key={index} style={styles.likesContainer}>
              <Text
                style={styles.likeText}
              >{repository.title}</Text>
              <Text
                style={styles.likeText}
              >{repository.techs.reduce((acc, tech) => acc + " " + tech, '')}</Text>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repository.id}`}
              >
                {repository.likes + " " }{repository.likes > 1 ? "curtidas" : "curtida"}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>)}

        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#000",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    textAlign:'center'
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    borderRadius: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#7159c1",
    width: "100%",
    padding: 15,
  },
});
