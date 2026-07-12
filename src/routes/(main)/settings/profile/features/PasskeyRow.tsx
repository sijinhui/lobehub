'use client';

import { ActionIcon, Alert, Flexbox, Icon, Text } from '@lobehub/ui';
import { Button, confirmModal } from '@lobehub/ui/base-ui';
import { createStaticStyles } from 'antd-style';
import { KeyRound, RefreshCw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { message } from '@/components/AntdStaticMethods';
import { passkey, useListPasskeys } from '@/libs/better-auth/auth-client';

import ProfileRow from './ProfileRow';

const styles = createStaticStyles(({ css, cssVar }) => ({
  item: css`
    padding-block: 4px;
    border-bottom: 1px solid ${cssVar.colorBorderSecondary};

    &:last-child {
      border-bottom: 0;
    }
  `,
  list: css`
    width: 100%;
  `,
}));

const PasskeyRow = () => {
  const { t } = useTranslation('auth');
  const { data, error, isPending, refetch } = useListPasskeys();
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();

  const handleAdd = async () => {
    setAdding(true);
    try {
      const result = await passkey.addPasskey({ name: t('profile.passkey.defaultName') });
      if (result.error) {
        if (!('code' in result.error) || result.error.code !== 'ERROR_CEREMONY_ABORTED') {
          message.error(result.error.message || t('profile.passkey.addError'));
        }
        return;
      }
      message.success(t('profile.passkey.added'));
      refetch();
    } catch (error) {
      console.error('Add passkey error:', error);
      message.error(t('profile.passkey.addError'));
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    confirmModal({
      cancelText: t('profile.cancel'),
      content: t('profile.passkey.deleteDescription', { name }),
      okButtonProps: { danger: true },
      okText: t('profile.passkey.delete'),
      title: t('profile.passkey.deleteTitle'),
      onOk: async () => {
        setDeletingId(id);
        try {
          const result = await passkey.deletePasskey({ id });
          if (result.error) {
            message.error(result.error.message || t('profile.passkey.deleteError'));
            return;
          }
          message.success(t('profile.passkey.deleted'));
          refetch();
        } catch (error) {
          console.error('Delete passkey error:', error);
          message.error(t('profile.passkey.deleteError'));
        } finally {
          setDeletingId(undefined);
        }
      },
    });
  };

  return (
    <ProfileRow
      label={t('profile.passkey.title')}
      action={
        <Button icon={<Icon icon={KeyRound} />} loading={adding} onClick={handleAdd}>
          {t('profile.passkey.add')}
        </Button>
      }
    >
      {isPending ? (
        <Text type="secondary">{t('profile.passkey.loading')}</Text>
      ) : error ? (
        <Alert
          showIcon
          description={t('profile.passkey.loadError')}
          type="error"
          action={
            <Button icon={<Icon icon={RefreshCw} />} size="small" onClick={() => refetch()}>
              {t('profile.passkey.retry')}
            </Button>
          }
        />
      ) : data && data.length > 0 ? (
        <Flexbox className={styles.list}>
          {data.map((item) => {
            const name = item.name || t('profile.passkey.defaultName');
            return (
              <Flexbox horizontal align="center" className={styles.item} gap={8} key={item.id}>
                <Icon icon={KeyRound} />
                <Text ellipsis style={{ flex: 1 }}>
                  {name}
                </Text>
                <ActionIcon
                  danger
                  icon={Trash2}
                  loading={deletingId === item.id}
                  title={t('profile.passkey.delete')}
                  onClick={() => handleDelete(item.id, name)}
                />
              </Flexbox>
            );
          })}
        </Flexbox>
      ) : (
        <Text type="secondary">{t('profile.passkey.empty')}</Text>
      )}
    </ProfileRow>
  );
};

export default PasskeyRow;
