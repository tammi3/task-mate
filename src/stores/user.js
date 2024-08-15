import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    auth,
    setDoc,
    doc,
    db,
  } from "@/db/firebase.js";
  import Swal from "sweetalert2";
  import { defineStore } from "pinia";
  
  export const useUserStore = defineStore("user", {
    // arrow function recommended for full type inference
    state: () => ({
      loading: false,
      loggedIn: false,
      error: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    }),
    getters:{},
    actions: {
      registerUser() {
        console.log(this.email, this.loading, this.password );
        const email = this.email;
        const password = this.password;
       
        createUserWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            const user = auth.currentUser;
            console.log(user);
            this.loggedIn= true;
            setDoc(doc(db, "users", user.uid), {
              email: this.email,
              password: this.password,
              name: {
                firstname: this.firstName,
                lastname: this.lastName,
              },
              updatedProfileImage: false,
              userId: user.uid,
              creationTime: user.metadata.creationTime,
            }).then(() => {
              setDoc(doc(db, "tasks", user.uid), {
              
                created_at: Timestamp.fromDate(new Date()),
                updated_at: Timestamp.fromDate(new Date()),
                tasks: [],
              });
            });
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully",
            });
            // const previousRoute = this.$router.options.history.state.back;
            // this.$router.push({ path: previousRoute });
          })
          .catch((err) => {
            if ((err.message = "Firebase: Error (auth/email-already-in-use).")) {
              this.error = "Email already associated with another account.";
              this.loading = false;
            } else {
              this.error = err.message.slice(9);
              this.loading = false;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
      },
      loginUser() {
        const email = this.email;
        const password = this.password;
        this.loading = true;
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: "success",
              title: "Welcome back!",
            });
            this.loggedIn= true;
            // const previousRoute = this.$router.options.history.state.back;
            // this.$router.push({ path: previousRoute });
          })
          .catch((err) => {
            if (err.message == "Firebase: Error (auth/invalid-email).") {
              this.error = "Invalid email.";
              this.loading = false;
            } else {
              this.error = "Invalid credentials.";
              this.loading = false;
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
          });
      },
    },
  });
  