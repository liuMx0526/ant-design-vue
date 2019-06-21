<template>
  <div>
    <a-form :layout="layout" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: payAccountRules
            }
          ]"
          placeholder="请输入付款账户"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="收款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账户',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        ></ReceiverAccount>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from "@/components/ReceiverAccount";
export default {
  components: {
    ReceiverAccount
  },
  data() {
    this.form = this.$form.createForm(this);
    return {
      layout: "horizontal",
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      payAccountRules: [{ required: true, message: "请输入付款账户" }]
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.commit({
            type: "form/saveStepFormData",
            payload: values
          });
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>
