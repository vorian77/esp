CREATE MIGRATION m1wxwh7goisftxyb3rcjkeoefprm2ed7dkhxofz7orq2wqe6ybhg7a
    ONTO m16nq2ddb6bagzpep7qsn3k2r4moe2g5r3zdgwoibnupcxn6mjsuka
{
  CREATE FUNCTION sys_core::getObjRoot(name: std::str) -> OPTIONAL sys_core::ObjRoot USING (SELECT
      std::assert_single((SELECT
          sys_core::ObjRoot
      FILTER
          (.name = name)
      ))
  );
};
