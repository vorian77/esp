CREATE MIGRATION m1hq2245qc64atvq67l75iwo5c7lsqzqatwrtvttimklpzh5ugpo7a
    ONTO m1ze2r23nizlvxawfxmp2temmjaxobwukme5gmu3debzqozxmqipya
{
  ALTER TYPE sys_user::SysUserPref {
      ALTER PROPERTY idFeature {
          SET TYPE std::uuid USING (<std::uuid>.idFeature);
      };
  };
};
