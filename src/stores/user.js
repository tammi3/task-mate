import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  reauthenticateWithCredential,
  deleteUser,
  deleteDoc,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  storage,
  deleteObject,
  linkWithPopup,
  provider,
  ref,
  query,
  collection,
  where,
  getDocs,
  getDownloadURL,
  uploadBytes,
  onSnapshot,
  updateDoc,
  auth,
  setDoc,
  signOut,
  doc,
  db,
} from "@/db/firebase.js";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // arrow function recommended for full type inference
  state: () => ({
    loading: false,
    error: "",
    loadingUpdateImg: false,
    loadingDeleteImg: false,
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profileImg: "",

    userInfo: {},
  }),
  getters: {},
  actions: {
    async registerUser() {
      const router = useRouter();
      const email = this.email;
      const password = this.password;
      this.loading = true;
      this.error = "";
      const validatePassword = (password) => {
        // Regular expressions to match the conditions
        const hasSixCharacters = /.{6,}/;
        const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
        const hasNumber = /\d/;

        // Check all conditions
        if (
          hasSixCharacters.test(password) &&
          hasSpecialCharacter.test(password) &&
          hasNumber.test(password)
        ) {
          return true; // Password is valid
        } else {
          return false; // Password is invalid
        }
      };
      const isPasswordStrong = validatePassword(password);
      console.log(isPasswordStrong);
      if (isPasswordStrong) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((cred) => {
            const user = auth.currentUser;
            console.log(user);

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
              this.email = "";
              this.password = "";
              this.firstName = "";
              this.lastName = "";
            });
            linkWithPopup(auth.currentUser, provider)
              .then((result) => {
                // Accounts successfully linked.
                const credential =
                  GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;
                console.log(user);
                // ...
              })
              .catch((error) => {
                // Handle Errors here.
                // ...
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

            router.push({ path: "/Dashboard/Main" });
          })
          .catch((err) => {
            this.loading = false;
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (
              (err.message = "Firebase: Error (auth/email-already-in-use).")
            ) {
              this.error = "Email already associated with another account.";
            } else {
              this.error = err.message.slice(9);
            }
          });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
        this.error =
          "Password must be at least 6 characters, with 1 special character and 1 number.";
      }
    },
    loginUser() {
      const router = useRouter();
      const email = this.email;
      const password = this.password;
      this.loading = true;
      this.error = "";
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
          this.email = "";
          this.password = "";
          router.push({ path: "/Dashboard/Main" });
        })
        .catch((err) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          this.loading = false;
          if (err.message == "Firebase: Error (auth/invalid-email).") {
            this.error = "Invalid email.";
          } else {
            this.error = err.message.slice(9);
          }
        });
    },
    async logOut() {
      const router = useRouter();
      signOut(auth)
        .then(() => {
          router.push({ path: "/Login" });
        })
        .catch((err) => {
          // console.log(err.message);
        });
    },
    getUserInfo() {
      const user = auth.currentUser;
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        this.userInfo = doc.data();
        if (this.userInfo.updatedProfileImage) {
          getDownloadURL(ref(storage, "profile/" + this.userInfo.profile_image))
            .then((url) => {
              // Or inserted into an <img> element
              this.profileImg = url;
              // const img = document.getElementById("profileImg");
              // img.setAttribute("src", url);
            })
            .catch((error) => {});
        }
      });
    },
    uploadImage() {
      this.loadingUpdateImg = true;
      const user = auth.currentUser;
      const updateImg = document.getElementById("updateImg");
      const inputFile = document.getElementById("inputFile");
      updateImg.src = URL.createObjectURL(inputFile.files[0]);
      var image = inputFile.files[0];

      const storageRef = ref(storage, "profile/" + image.name);

      //uploads image to database
      uploadBytes(storageRef, image).then((snapshot) => {
        //updates the user profile picture information
        updateDoc(doc(db, "users", user.uid), {
          profile_image: image.name,
          updatedProfileImage: true,
        });
        this.loadingUpdateImg = false;
      });
    },
    deleteImage() {
      this.loadingDeleteImg = true;
      const user = auth.currentUser;
      const storageRef = ref(storage, "profile/" + this.userInfo.profile_image);
      deleteObject(storageRef).then(() => {
        updateDoc(doc(db, "users", user.uid), {
          updatedProfileImage: false,
        });
        this.loadingDeleteImg = false;
      });
    },
    async deleteAccount() {
      const { value: password } = await Swal.fire({
        title: "Enter your password",
        input: "password",
        // inputLabel: "Your password is required to delete your account",
        showCancelButton: true,
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off",
        },
        inputValidator: (value) => {
          if (!value) {
            return "Your password is required to delete your account";
          }
        },
      });
      if (password) {
        const user = auth.currentUser;
        const storageRef = ref(
          storage,
          "profile/" + this.userInfo.profile_image
        );
        const userRef = doc(db, "users", user.uid);
        if (this.userInfo.updatedProfileImage) {
          const credential = EmailAuthProvider.credential(user.email, password);
          reauthenticateWithCredential(user, credential)
            .then(() => {
              deleteUser(user)
                .then(() => {
                  deleteObject(storageRef)
                    .then(() => {
                      deleteDoc(userRef).then(() => {
                        // this.$router.replace({ name: "Signup" });
                      });
                    })
                    .catch((error) => {});
                })
                .catch((error) => {});
            })
            .catch((error) => {
              // An error ocurred
              Swal.fire("Incorrect password");
            });
        } else {
          const credential = EmailAuthProvider.credential(user.email, password);
          reauthenticateWithCredential(user, credential)
            .then(() => {
              deleteUser(user)
                .then(() => {
                  deleteDoc(userRef).then(() => {
                    // this.$router.replace({ name: "Signup" });
                  });
                })
                .catch((error) => {});
            })
            .catch((error) => {
              Swal.fire("Incorrect password");
            });
        }
      }
    },
    signInWithGoogle() {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
});
