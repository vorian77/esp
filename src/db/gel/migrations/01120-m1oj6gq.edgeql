CREATE MIGRATION m1oj6gqibe4st4iyhi4drdf3ethqxffjsoiqcd7fyaaizsagtakcuq
    ONTO m154yulsmiqfui7rjxf4u7jfaddusaftctht4tl6psm2jfdos3gtxq
{
  ALTER TYPE default::SysError {
      CREATE REQUIRED PROPERTY isClosed: std::bool {
          SET default := false;
      };
      CREATE PROPERTY note: std::str;
  };
};
