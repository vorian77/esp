CREATE MIGRATION m1lcwukejrrv5hnxzp7l2lgeges4wadn6frgwfrlsnwgln34w6ajgq
    ONTO m1zsu4kykrgj4bebjomajquzem3zsmkjnvzlqibqsukyeohdqtttfq
{
          ALTER TYPE sys_core::SysDataObjFieldListItems {
      ALTER LINK props1 {
          RENAME TO props;
      };
  };
};
