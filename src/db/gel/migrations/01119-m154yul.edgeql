CREATE MIGRATION m154yulsmiqfui7rjxf4u7jfaddusaftctht4tl6psm2jfdos3gtxq
    ONTO m1dp2bb5jbbfe4g6vpln66mwymzgmgk6dblznas3bjaxvgfpvodzfa
{
  ALTER TYPE default::SysError {
      CREATE REQUIRED PROPERTY errMsgUser: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
