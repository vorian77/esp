CREATE MIGRATION m1ese32fdbpw7hs5hlnpius3aiibqyzpz4jozf7pfpi3tdn7tk2zpq
    ONTO m1zbox43753rp7dkdi5wqtltq26pie2m2736du55qhr5bodtem4kcq
{
  ALTER TYPE sys_core::SysDataObj {
      ALTER PROPERTY testProp {
          RENAME TO testPropOld;
      };
  };
};
