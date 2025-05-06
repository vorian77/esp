CREATE MIGRATION m1lh2zy2pfyhuydkugq5ivzd2ntf7hri5q4dtr6gmjk3k425k5zhbq
    ONTO m1jen3kj5lamdsdrstt26j55ad7wumhqqoyxdynowvq6ruc4y6fpla
{
  DROP FUNCTION sys_core::isObjectLink(objName: std::str, linkName: std::str);
  ALTER TYPE default::SysError {
      ALTER LINK user {
          RESET OPTIONALITY;
      };
  };
};
