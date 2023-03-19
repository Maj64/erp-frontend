<template>
  <div style="overflow: hidden; height: 100vh">
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        :style="{
          width: windowWidth <= 992 ? '100%' : '520px',
          height: windowWidth <= 992 ? '100vh' : 'unset',
          marginTop: windowWidth <= 992 ? '0px' : '10vh',
          borderRadius: windowWidth <= 992 ? '0px' : '5px',
        }"
      >

        <div class="title-container">
          <!--<img class="logo" :src="logo" alt="logo" />-->
          <h1 class="title-logo">Hồ sơ xây dựng</h1>
          <br>
          <h3 class="title-logo">Đăng nhập để bắt đầu!</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Email"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Mật khẩu"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-button type="text" size="small" @click="handlePass">Quên mật khẩu?</el-button>

        <el-row>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:15px;" @click.native.prevent="handleLogin">Đăng nhập</el-button>
        </el-row>

        <el-row>
          <el-button :loading="loading" style="width:100%;margin-bottom:15px;" @click="handleSignup">Đăng ký</el-button>
        </el-row>
        <br>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import defaultSettings from '@/settings'
// import logo from '@/assets/images/logo.png'

export default {
  name: 'Login',
  data() {
    // const validateUsername = (rule, value, callback) => {
    //   if (!validUsername(value)) {
    //     callback(new Error('Vui lòng nhập Email'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validatePassword = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('Vui lòng nhập mật khẩu'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      title: defaultSettings.title || 'CMS',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
      this.windowHeight = window.innerHeight
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleSignup() {
      this.$router.push('/signup')
    },
    handlePass() {
      this.$router.push('/')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg:#f3f4f6;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    //color: $cursor;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $bg inset !important;
    }
  }
}

/* reset element-ui css */
.login-container {
  position: relative;
  .logo {
    width: 220px;
    height: 210px;
  }
  .title-logo {
    span {
      color: #f43f5e;
    }
  }

  .title-content {
    font-weight: 600;
    font-size: 24px;
    color: #435b71;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      --webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      height: 47px;
    }
  }

  .el-form-item {
    border: 1px solid #dcdfe6;
    border-radius: 5px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#f3f4f6;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    z-index: 2;
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 20px;
    margin: 10vh auto;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background: #fff;
    border-radius: 5px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    text-align: center;

    .title {
      font-size: 26px;
      //color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
