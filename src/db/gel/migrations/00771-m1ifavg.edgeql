CREATE MIGRATION m1ifavg6jjwo4zlhodmxyzcvpell33e4rwpcerxzt4odswqzsq7xsa
    ONTO m1nfkpnnhj2ienmlqijufy2zb5mo3uhjulw4pmwld47llisg35kxdq
{
          ALTER TYPE sys_core::SysDataObjFieldListItemsProp {
      ALTER PROPERTY label {
          RENAME TO header;
      };
  };
};
