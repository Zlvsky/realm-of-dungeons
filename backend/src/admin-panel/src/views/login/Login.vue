<template>
  <div class="vertical-center">
    <div class="container-sm content-wrap-sm">
      
        <div class="d-flex flex-column justify-content-start">
          <h1 class="col">Login</h1>
          <h6 class="col">Login to access Admin Panel 🧠</h6>
        </div>
        <form class="d-flex flex-column gap-4 mt-4" @submit.prevent="login">
          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="accountname" class="form-control form-control-lg" placeholder="admin" required/>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control form-control-lg" placeholder="********" required/>
          </div>
          <button type="submit" class="btn btn-primary btn-lg">Login</button>
        </form>
 
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { signInService } from "../../client/services/auth/loginService";

export default {
  name: "login-page",
  components: {},
  data() {
    return {
      accountname: "",
      password: ""
    };
  },
  methods: {
    async login() {
      const response = await signInService({
        accountname: this.accountname,
        password: this.password
      });
      if (response.status !== 200) return console.log("failed");
      if (!response.data.isAdmin) return console.log("not auth");
      router.push("/");
    }
  }
};
</script>
