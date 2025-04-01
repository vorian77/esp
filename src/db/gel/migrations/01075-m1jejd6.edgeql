CREATE MIGRATION m1jejd6ld5pgkoqywxdtw3whk45dgzhzvro4j4xtjzujcar7ry3esa
    ONTO m13nqcvulvjgka72czhruozvbsuspbak4jxfnwfywoo3tpcrlu3raq
{
  DROP FUNCTION sys_core::getCodeAction(codeTypeName: std::str, codeName: std::str);
  CREATE FUNCTION sys_core::getCodeAction(codeName: std::str) -> OPTIONAL sys_core::SysCodeAction USING (SELECT
      std::assert_single(sys_core::SysCodeAction FILTER
          (.name = codeName)
      )
  );
};
