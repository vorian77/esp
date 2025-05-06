CREATE MIGRATION m1zbox43753rp7dkdi5wqtltq26pie2m2736du55qhr5bodtem4kcq
    ONTO m1jlogi56g4ww562yb5jtvavkh2ojvh67z32zpzbquobhvwhvzsiaq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE PROPERTY testProp: std::str;
  };
};
