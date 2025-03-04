CREATE MIGRATION m1sw2wzacwyrgvwo4rjm6xhwso6nwkimiitljsvlgqsbhoc7aje52a
    ONTO m1ozlwv436d6e2piijylfikianrjgdyb5jyo7nuv3kdie6ohbpiqva
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      CREATE MULTI LINK props: sys_core::SysDataObjFieldListItemsProp {
          ON SOURCE DELETE DELETE TARGET;
          ON TARGET DELETE ALLOW;
      };
  };
};
