CREATE MIGRATION m1ul44ynuai5tnj625o5ljr6wuz6ujog4m4wl3k6lnahevberrw37q
    ONTO m1ba2vlcuuyax4hvnjifpdnahcdfkpnyaafo52uvbaz22htuiekbwq
{
  ALTER TYPE sys_core::SysDataObjActionConfirm {
      CREATE PROPERTY cancelButtonLabel: std::str;
      ALTER PROPERTY confirmButtonLabel {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY confirmMessage {
          RESET OPTIONALITY;
      };
      ALTER PROPERTY confirmTitle {
          RESET OPTIONALITY;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumn {
      DROP PROPERTY exprOrder;
  };
};
