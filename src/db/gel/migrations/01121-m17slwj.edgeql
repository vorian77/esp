CREATE MIGRATION m17slwjg2rensxfuq7caz2gff5kyoa7mwqzbiielusqnbgkxy7cpwq
    ONTO m1oj6gqibe4st4iyhi4drdf3ethqxffjsoiqcd7fyaaizsagtakcuq
{
  ALTER TYPE default::SysError {
      ALTER PROPERTY errCode {
          RESET OPTIONALITY;
      };
      CREATE PROPERTY errStatus: std::str;
  };
};
