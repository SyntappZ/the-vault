<template>
  <div class="notes page">
    <v-snackbar v-if="pageWidth" v-model="snackbar" :timeout="timeout" top>
      {{ snackbarMessage }}
      <v-btn color="primary" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-else v-model="snackbar" :timeout="timeout" bottom>
      {{ snackbarMessage }}
      <v-btn color="primary" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-btn class="mt-4" v-if="!pageWidth" color="secondary" outline round flat @click="sheet = true">
       <v-icon>list</v-icon>
       <span class="pl-1">Notes List</span>
      
      
      </v-btn>

    <div class="wrap">
      <div class="notes-list" v-if="pageWidth">
        <v-card>
          <v-toolbar color="primary" flat dark>
            <v-toolbar-title>Notes</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn @click="toggleStarFilter()" icon>
              <v-icon v-if="starsOnly == false" color="white">star_border</v-icon>

              <v-icon v-else color="white">star</v-icon>
            </v-btn>
          </v-toolbar>

          <v-list two-line dark>
            <template v-for="(note, index) in notes">
              <v-list-tile
                :key="note.id"
                avatar
                ripple
                v-if="note.show"
                @click="displayNote(note.id, note.title, note.note)"
              >
                <v-list-tile-content>
                  <v-list-tile-title>{{ note.title }}</v-list-tile-title>

                  <v-list-tile-sub-title class="font-weight-thin">{{ note.preview }}</v-list-tile-sub-title>
                  <v-list-tile-action-text>{{ note.words }} words</v-list-tile-action-text>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>{{ note.date }}</v-list-tile-action-text>
                  <v-btn @click="starToggle(note.starred, note.id)" icon>
                    <v-icon v-if="note.starred == false" color="grey lighten-1">star_border</v-icon>

                    <v-icon v-else color="yellow darken-2">star</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < note.length" :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </div>

      <div class="text-center" v-if="!pageWidth">
        <v-bottom-sheet v-model="sheet">
          <div class="notes-list">
            <v-card>
              <v-toolbar color="primary" flat dark>
                <v-toolbar-title>Notes</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn @click="toggleStarFilter()" icon>
                  <v-icon v-if="starsOnly == false" color="white">star_border</v-icon>

                  <v-icon v-else color="white">star</v-icon>
                </v-btn>
              </v-toolbar>

              <v-list two-line dark>
                <template v-for="(note, index) in notes">
                  <v-list-tile
                    :key="note.id"
                    avatar
                    ripple
                    v-if="note.show"
                    @click="displayNote(note.id, note.title, note.note)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ note.title }}</v-list-tile-title>

                      <v-list-tile-sub-title class="font-weight-thin">{{ note.preview }}</v-list-tile-sub-title>
                      <v-list-tile-action-text>{{ note.words }} words</v-list-tile-action-text>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>{{ note.date }}</v-list-tile-action-text>
                      <v-btn @click="starToggle(note.starred, note.id)" icon>
                        <v-icon v-if="note.starred == false" color="grey lighten-1">star_border</v-icon>

                        <v-icon v-else color="yellow darken-2">star</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider v-if="index + 1 < note.length" :key="index"></v-divider>
                </template>
              </v-list>
            </v-card>
            <v-btn v-if="!pageWidth" color="white" flat dark @click="sheet = false">Close</v-btn>
          </div>
        </v-bottom-sheet>
      </div>

      <div class="notes-area">
        <v-container class="note" fluid grid-list-md>
          <v-toolbar class="note-tool" color="primary" dark flat>
            <v-icon class="mr-3">note</v-icon>
            <h3>Create Note</h3>

            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="newNote" icon>
                  <v-icon>note_add</v-icon>
                </v-btn>
              </template>
              <span>New Note</span>
            </v-tooltip>

            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" @click="deleteNote()" icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </template>
              <span>Delete Note</span>
            </v-tooltip>

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
            <v-btn
              color="primary"
              :disabled="title.length < 3 || words < 1 ? true : false"
              flat
              round
              @click="addNote"
            >save</v-btn>
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
            this.temp.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          } else if (change.type === "modified") {
            this.notes.map(note => {
              if (note.id === change.doc.id) {
                note.title = change.doc.data().title;
                note.note = change.doc.data().note;
                note.words = change.doc.data().words;
                note.preview = change.doc.data().preview;
                note.starred = change.doc.data().starred;
                note.show = change.doc.data().show;
              }
            });
          } else if (change.type === "removed") {
            let removedNotes = this.notes.filter(
              note => note.id != change.doc.id
            );
            this.notes = removedNotes;
          }
        });
      });
  },
  components: {},
  data() {
    return {
      title: "",
      selected: [2],
      userSignedIn: false,
      loaded: true,
      starsOnly: false,
      note: "",
      notes: [],
      userId: "",
      temp: [],
      editNote: false,
      noteId: "",
      mouseOverStar: false,
      snackbar: false,
      snackbarMessage: "",
      timeout: 6000,
      sheet: false
    };
  },
  methods: {
    addNote() {
      if (this.editNote) {
        db.collection("users")
          .doc(this.userId)
          .collection("notes")
          .doc(this.noteId)
          .update({
            title: this.title,
            note: this.note,
            date: this.date,
            words: this.words,
            preview: this.preview,
            starred: false,
            show: true
          })
          .then(() => {
            this.title = "";
            this.note = "";
            this.editNote = false;
            this.snackbar = true;
            this.snackbarMessage = "Note Updated!";
          });
      } else {
        db.collection("users")
          .doc(this.userId)
          .collection("notes")
          .add({
            title: this.title,
            note: this.note,
            date: this.date,
            words: this.words,
            preview: this.preview,
            starred: false,
            show: true
          })
          .then(() => {
            this.title = "";
            this.note = "";
            this.snackbar = true;
            this.snackbarMessage = "Note Saved!";
          });
      }
    },
    newNote() {
      this.title = "";
      this.note = "";
      this.noteId = "";
      this.editNote = false;
      this.mouseOverStar = false;
    },

    starToggle(starred, id) {
      this.mouseOverStar = true;
      if (starred) {
        db.collection("users")
          .doc(this.userId)
          .collection("notes")
          .doc(id)
          .update({ starred: false });
      } else {
        db.collection("users")
          .doc(this.userId)
          .collection("notes")
          .doc(id)
          .update({ starred: true });
      }
      setTimeout(() => {
        this.mouseOverStar = false;
      }, 300);
    },
    toggleStarFilter() {
      if (this.starsOnly) {
        this.starsOnly = false;
        this.notes.map(x => (x.show = true));
      } else {
        this.starsOnly = true;
        for (let i = 0; i < this.notes.length; i++) {
          if (this.notes[i].starred == false) {
            this.notes[i].show = false;
          }
        }
      }
    },
    displayNote(id, title, note) {
      if (this.mouseOverStar === false) {
        this.noteId = id;
        this.editNote = true;
        this.title = title;
        this.note = note;
        this.mouseOverStar = false;
        this.sheet = false;
      }
    },

    deleteNote() {
      if (this.noteId != "") {
        if (confirm("Are You Sure?")) {
          db.collection("users")
            .doc(this.userId)
            .collection("notes")
            .doc(this.noteId)
            .delete()
            .then(() => {
              this.noteId = "";
              this.title = "";
              this.note = "";
              this.snackbar = true;
              this.snackbarMessage = "Note Deleted!";
            });
        }
      }
    }
  },
  computed: {
    pageWidth() {
      return window.innerWidth > 800 ? true : false;
    },
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
      let noteArr = this.note.split(" ").filter(x => !x == " ").length;

      return noteArr;
    },
    preview() {
      return (
        this.note
          .split(" ")
          .filter(x => !x == " ")
          .slice(0, 5)
          .join(" ") + "..."
      );
    }
  },
  minimumLetters() {
    if (this.title.length < 3 || this.words < 1) {
      return false;
    } else {
      return true;
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
}
.notes-list {
  width: 20%;
  height: 92vh;
  overflow-y:auto;
  background-color: rgb(63, 63, 63);
  padding-bottom: 70px;
}
.notes-area {
  width: 80%;
  height: 100vh;
  border-radius: 5px;
  overflow-y: auto;
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
@media (max-width: 800px) {
  .notes-area {
    width: 100%;
  }
  .note {
    width: 95%;
    margin-top: 10px;
  }
  .notes-list {
    width: 100%;
    margin: auto;
    padding-bottom: 50px;
  }
}
</style>