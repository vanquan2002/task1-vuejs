<template>
  <div>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="User name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.userName"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-2"
        label="Your password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <button class="btn-submit" type="submit" variant="primary">Login</button>
    </b-form>
  </div>
</template>

<script>
import toastMessage from "@/mixins/toastMessage";
export default {
  mixins: [toastMessage],
  data() {
    return {
      form: {
        userName: "",
        password: "",
      },
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$store.commit("logIn", JSON.stringify(this.form));
      if (this.isLogIn) {
        this.form.userName = "";
        this.form.password = "";
        this.show = false;
        this.$emit("close-modal");
        setTimeout(() => {
          this.makeToast("info", "Logged in successfully!");
        }, 300);
      } else {
        this.makeToast("danger", "User name or password is incorrect!");
      }
    },
  },
  computed: {
    isLogIn() {
      return this.$store.getters.getIsLogIn;
    },
  },
  created() {
    this.$store.dispatch("getUsers");
  },
};
</script>

<style>
.btn-submit {
  width: 100%;
  padding: 8px 0;
  border-radius: 5px;
  background-color: #17a2b8;
  border: none;
  transition: 0.5s;
  color: #fff;
}
.btn-submit:hover {
  background-color: #17a3b8b6;
}
</style>
