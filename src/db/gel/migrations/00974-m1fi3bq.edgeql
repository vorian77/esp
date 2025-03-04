CREATE MIGRATION m1fi3bql3agpwuap72kta2o5b6uiejsdgmlxxz7ngnak4o7tmpztva
    ONTO m14zvh5kwcq4pugovx4dfjrmob2i7i44q4zfnxmacdiivuybfbqqla
{
  ALTER TYPE sys_core::SysDataObjQueryRider {
      ALTER PROPERTY isCustomLogic {
          RENAME TO hasCustomLogic;
      };
  };
};
