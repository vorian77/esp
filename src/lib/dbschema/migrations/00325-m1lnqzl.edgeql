CREATE MIGRATION m1lnqzlmn5etvjuv6cjsbpma6curk6j7b7awnrgcykwjioqbflwziq
    ONTO m1v57zpjqdulaoa2pqzy2wkmniszx6mms3iekh2q7i6t4ueh2v5wvq
{
  ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP PROPERTY exprPropOther;
  };
};
