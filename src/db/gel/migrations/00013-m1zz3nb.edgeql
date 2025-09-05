CREATE MIGRATION m1zz3nbxz5wyfmstwvummnkldts6fhujbotfsb3xbpecxcpxz4ocyq
    ONTO m16obhayvz6xfnb2apd7v6xgvjpnfvnxptg7nukpxghw3t33pmzkka
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK columnStyles {
          RENAME TO fieldStyles;
      };
  };
};
