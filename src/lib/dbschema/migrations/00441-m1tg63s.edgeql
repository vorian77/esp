CREATE MIGRATION m1tg63sf6g7egtxufogk72cbmmj2xxpyzthvfn4obz5ptoq6whnbnq
    ONTO m1frsfywolwxpdt34segwshnmzoxb4nc4rz5iu7svoj5hl7uir7gxq
{
  ALTER TYPE sys_rep::SysRepUserEl {
      CREATE REQUIRED PROPERTY isDisplay: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
