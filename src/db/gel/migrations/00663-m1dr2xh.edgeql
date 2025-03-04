CREATE MIGRATION m1dr2xhixbejn7fte7c2czrqx7emz4y5uvde5enah4irur3r6q6shq
    ONTO m12uc42dpbxrxunj7ofdwhmnzpakc7t5zsg6iig73moph2h5wwdbrq
{
              ALTER TYPE sys_user::SysUserType {
      ALTER LINK resourcea_sys_footer {
          RENAME TO resources_sys_footer;
      };
  };
  ALTER TYPE sys_user::SysUserType {
      ALTER LINK resourcea_sys_widget {
          RENAME TO resources_sys_widget;
      };
  };
};
