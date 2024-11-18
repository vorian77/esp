CREATE MIGRATION m1m5zjsilkh2iov6olf2kbfxaauaynbjaukymy3lcb2iqartuo3q7a
    ONTO m1sjch5d2wdxhcb46jczot35n3z4lso5oakb2wo5yg3zmaexeuhgta
{
  ALTER TYPE sys_core::SysDataObjActionFieldGroup {
      ALTER LINK actions {
          CREATE PROPERTY order: default::nonNegative;
      };
  };
};
