CREATE MIGRATION m1ozlwv436d6e2piijylfikianrjgdyb5jyo7nuv3kdie6ohbpiqva
    ONTO m1lcwukejrrv5hnxzp7l2lgeges4wadn6frgwfrlsnwgln34w6ajgq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      DROP LINK props;
  };
};
