<template>
  <div>
    <a-form :layout="layout" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        >{{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        >{{ step.receiverAccount.number }}
      </a-form-item>
      <a-form-item
        label="密码"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          type="password"
          v-decorator="[
            'password',
            {
              initialValue: step.payAccount,
              rules: payAccountRules
            }
          ]"
          placeholder="请输入付款密码"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="margin-left: 10px;" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      layout: "horizontal",
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      payAccountRules: [{ required: true, message: "请输入付款密码" }]
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...this.step, ...values }
          });
        }
      });
    },
    onPrev() {
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>
