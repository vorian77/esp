CREATE MIGRATION m14zvh5kwcq4pugovx4dfjrmob2i7i44q4zfnxmacdiivuybfbqqla
    ONTO m1qmg5or356z4rpk7couodgrcyxacmdjso43x75fh7usvosg3vbiqq
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY parmKey {
          RENAME TO logicParmKey;
      };
  };
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY parmValue {
          RENAME TO logicParmValue;
      };
  };
};
