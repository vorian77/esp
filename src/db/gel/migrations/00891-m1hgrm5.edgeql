CREATE MIGRATION m1hgrm5bwgyfdktqi3kiw4kx6comdavwtqb7svg3bkxajbk3y42sjq
    ONTO m1cudx7bzjd6co7gzfg5mj7kvswjcz5yijllv77tf6qeb5vhilo4za
{
  CREATE FUNCTION sys_core::getCodeAction(codeTypeName: std::str, codeName: std::str) -> OPTIONAL sys_core::SysCodeAction USING (SELECT
      std::assert_single(sys_core::SysCodeAction FILTER
          ((.codeType.name = codeTypeName) AND (.name = codeName))
      )
  );
};
