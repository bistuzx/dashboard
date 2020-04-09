import { k8sStatusColumn } from '@K8S/utils/tableColumns'
import { getNameDescriptionTableColumn } from '@/utils/common/tableColumn'

export default {
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        edit: false,
        showDesc: false,
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={() => this.handleOpenSidepage(row)}>{ row.name }</side-page-trigger>
          )
        },
      }),
      {
        field: 'podIP',
        title: 'IP',
        minWidth: '100px',
      },
      {
        field: 'namespace',
        title: '命名空间',
        width: 120,
      },
      k8sStatusColumn({ path: 'warnings' }),
      {
        field: 'restartCount',
        title: '重启次数',
        minWidth: '80px',
      },
      {
        field: 'creationTimestamp',
        title: '创建于',
        width: 80,
        formatter: ({ row }) => {
          return this.$moment(row.creationTimestamp).fromNow()
        },
      },
    ]
  },
}
