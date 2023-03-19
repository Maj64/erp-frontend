<template>
  <div class="app-content">
    <div class="feature-container">
      <div class="feature-header">Wallet</div>
      <div class="feature-item">
        <button class="btn btn-add">Thêm mới</button>
      </div>
    </div>
    <Table :columns="columns" :data-source="dataList" :class-name="className">
      <template v-slot:required="{ rowData }">
        <div class="action-item">
          <div class="row-text">{{ rowData.numConfirmationsRequired }}</div>
          <button class="btn btn-edit">Thay đổi</button>
        </div>
      </template>
      <template v-slot:action>
        <div class="action">
          <div class="action-item"><button
            class="btn-size deposit-btn btn-normal"
          >Chinh sua</button></div>
          <div class="action-item"><button class="btn withdraw-btn">Xoa</button></div>
        </div>
      </template>
    </Table>
    <!-- <Form :dialog-data="dialogData" :data-form="dataForm" :form-list="formData">
      <template v-slot:owners>
        <div class="owner-header">
          <h3>Danh sách người sở hữu ví:</h3>
          <div class="action-item"><button class="btn" @click="handleAddOwner">Add</button></div>
        </div>
        <Table :class-name="classNameForm" :columns="columnOwner" :data-source="wallet.owners">
          <template v-slot:action="{ rowData }">
            <div class="action-item"><button class="btn btn-danger" @click="handleRemoveOwner(rowData)">Remove</button>
            </div>
          </template>
        </Table>
      </template>
      <template v-slot:footerDialog>
        <el-button type="info" class="btn-normal btn-cancel" plain @click="handleCancel">Cancel</el-button>
        <div v-if="dialogData.action">
          <el-button type="success" class="btn" @click="handleSubmit">Send Transaction</el-button>
        </div>
        <div v-else>
          <el-button type="success" class="btn" @click="handleSubmit">Submit</el-button>
        </div>
      </template>
    </Form> -->
  </div>
</template>
<script>
import Table from '@/components/MyTableComponent/Table.vue'
// import Form from '@/components/MyDialogComponent/Form.vue'
import CustomerAPI from '@/api/customerApi'

export default {
  name: 'Wallet',
  components: {
    Table
    // Form
  },
  data() {
    return {
      loadingTable: false,
      className: 'table-container-height',
      classNameForm: 'table-container',
      dialogData: {
        title: '',
        dialogVisible: false,
        template: 'footerDialog',
        type: null,
        action: null
      },
      dataForm: {},
      formData: [],
      formList: [
        { type: 'text', label: 'Tên ví', field: 'name' },
        { type: 'number', label: 'Số người cần xác nhận', field: 'numConfirmationsRequired' },
        { template: 'owners' }
      ],
      columns: [
        { name: 'Tên khach hang', field: 'customer_name' },
        { name: 'Tên nguoi lien he', field: 'contact_person_name' },
        { name: 'Email', field: 'contact_email' },
        { name: 'Phone', field: 'phone_number' },
        { name: 'Dia chi thanh toan', field: 'billing_address' },
        { name: 'Dia chi giao hang', field: 'shipping_address' },
        { name: 'Thao tác', template: 'action' }
      ],
      dataList: [],
      wallet: {
        name: '',
        address: '',
        balance: '',
        numConfirmationsRequired: '',
        owners: [{
          name: '',
          address: ''
        }]
      }
    }
  },
  mounted() {
    this.getCustomerList()
  },
  methods: {
    async getCustomerList() {
      try {
        const { data } = await CustomerAPI.getAll()
        // console.log(customers)
        this.dataList = [...data]
      } catch (error) {
        this.$message.error(error.message)
      }
    }
  }
}
</script>
<style lang="">

</style>
