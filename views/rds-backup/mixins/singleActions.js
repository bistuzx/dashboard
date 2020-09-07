import i18n from '@/locales'

export default {
  created () {
    this.singleActions = [
      {
        label: i18n.t('db.text_45'),
        action: (obj) => {
          this.createDialog('RDSBackupRecovery', {
            title: i18n.t('db.text_45'),
            data: [obj],
            columns: this.columns,
            onManager: this.onManager,
            refresh: this.refresh,
          })
        },
        meta: (obj) => {
          return {
            validate: obj.status === 'ready',
            tooltip: obj.status !== 'ready' ? i18n.t('db.text_224') : '',
          }
        },
      },
      {
        label: i18n.t('db.text_69'),
        action: obj => {
          this.onManager('performAction', {
            steadyStatus: ['running', 'ready'],
            id: obj.id,
            managerArgs: {
              action: 'syncstatus',
            },
          })
        },
        meta: () => ({
          validate: true,
        }),
      },
      {
        label: i18n.t('db.text_42'),
        permission: 'rds_dbinstancebackups_delete',
        action: (obj) => {
          this.createDialog('DeleteResDialog', {
            title: i18n.t('db.text_42'),
            name: i18n.t('db.text_44'),
            data: [obj],
            columns: this.columns,
            onManager: this.onManager,
            refresh: this.refresh,
          })
        },
        meta: () => {
          if (this.data.brand === 'Aliyun') {
            return {
              validate: false,
              tooltip: i18n.t('db.text_214'),
            }
          }
          return {
            validate: true,
          }
        },
      },
    ]
  },
}