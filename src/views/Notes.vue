<template>
  <div class="notes page">
    <div class="wrap">
      <div class="notes-list">
        <v-card>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title>Notes</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>star</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line dark>
            <template v-for="(note, index) in notes">
              <v-list-tile :key="note.title" avatar ripple @click="toggle(index)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ note.title }}</v-list-tile-title>
                 
                  <v-list-tile-sub-title class="font-weight-thin">{{ note.preview }}</v-list-tile-sub-title>
                  <v-list-tile-action-text>{{ note.words }} words</v-list-tile-action-text>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ note.date }}</v-list-tile-action-text>
                  <v-icon v-if="selected.indexOf(index) < 0" color="grey lighten-1">star_border</v-icon>

                  <v-icon v-else color="yellow darken-2">star</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < note.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </div>

      <div class="notes-area">
        <v-container class="note" fluid grid-list-md>
          <v-toolbar class="note-tool" color="primary" dark flat>
             <v-icon class="mr-3">note</v-icon>
            <h3>Create Note</h3>
            
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>note_add</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>delete</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <form>
            <v-text-field v-model="title" label="Title" data-vv-name="name" required></v-text-field>
             
             <h3 class="text-xs-right pb-3 font-weight-thin">words: {{ words }}</h3>
            
            <h3 class="text-xs-right pb-3 font-weight-thin">
              
              <v-icon>date_range</v-icon>
              {{ date }}
            </h3>

            <v-divider></v-divider>
            <v-textarea name="input-7-1" v-model="note" label="Note" flat auto-grow value></v-textarea>
            <v-btn color="primary" flat round @click="addNote">save</v-btn>
          </form>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/components/firebaseInit";
import firebase from "firebase";
export default {
  created() {
      this.$emit("changePage", 3);
     firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.userSignedIn = true;
      } else {
        this.userSignedIn = false;
      }
    });
   let user = firebase.auth().currentUser;
    db.collection("users")
      .doc(user.uid)
      .collection("notes")
      .onSnapshot(res => {
        const changes = res.docChanges();

        changes.forEach(change => {
          if (change.type === "added") {
            this.notes.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          } else if (change.type === "modified") {
            this.notes.map(password => {
              if (password.id === change.doc.id) {
                // password.website = change.doc.data().website;
                // password.password = change.doc.data().password;
                // password.strength = change.doc.data().strength;
                // password.favorite = change.doc.data().favorite;
              }
            });
          } else if (change.type === "removed") {
            // let removedNotes = this.notes.filter(
            //   note => note.id != note.doc.id
           // );

           // this.notes = removedNotes;
          }
        });
      });
  },
  components: {},
  data() {
    return {
      title: "",
      selected: [2],
      loaded: true,
      note: '',
      notes: [],
      userId: ''
     
    };
  },
  methods: {
    addNote() {
       db.collection("users")
            .doc(this.userId)
            .collection("notes")
            .add({
             title: this.title,
             note: this.note,
             date: this.date,
             words: this.words,
             preview: this.preview
            })
            .then(() => {
             
            });
        },
         toggle (index) {
        const i = this.selected.indexOf(index)

        if (i > -1) {
          this.selected.splice(i, 1)
        } else {
          this.selected.push(index)
        }
      }
    
      
    
    
  },
  computed: {
    date() {
      let today = new Date();
      let date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

      return date;
    },
    words() {
      let noteArr = this.note.split(' ').filter(x => !x == ' ').length

      return noteArr
    },
    preview() {
     return this.note.split(' ').filter(x => !x == ' ').slice(0, 5).join(' ') + '...'
    }
  }
};
</script>

<style scoped>
.notes {
  background-color: #eee;
}
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
}
.notes-list {
  width: 20%;
  height: 92vh;
  background-color: rgb(63, 63, 63);
}
.notes-area {
  width: 80%;
  height: 100vh;
  border-radius: 5px;
  overflow-y: auto;
  background-color: rgb(224, 224, 224);
}
.note {
  margin-top: 50px;
  width: 70%;
  background-color: #fff;
  height: 80vh;
  border-radius: 10px;
  overflow-y: auto;
}
.note-tool {
  border-radius: 10px;
}
</style>