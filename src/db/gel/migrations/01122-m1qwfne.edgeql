CREATE MIGRATION m1qwfneafczlv6xun6tlcyje7vrbhzbpqheogtjpow4umkw42t6z7q
    ONTO m17slwjg2rensxfuq7caz2gff5kyoa7mwqzbiielusqnbgkxy7cpwq
{
  ALTER TYPE default::SysError {
      ALTER PROPERTY errStatus {
          SET TYPE std::int16 USING (<std::int16>.errStatus);
      };
  };
};
