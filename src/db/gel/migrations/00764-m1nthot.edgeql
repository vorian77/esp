CREATE MIGRATION m1nthotnjyt4q62cxriok423gystvmbyb44uh43vju2aurfvo4iraq
    ONTO m1k7gbeib4z55mnrd6jokj6s27kcwf4ykyffe44mtklhtzacuyyq4q
{
          ALTER TYPE sys_user::SysUser {
      ALTER PROPERTY password {
          SET default := (WITH
              chars := 
                  ['a', 'b', 'c', 'd', 'e', 'f', 'g', '❤️', '😇', '🏆', '🔥', '🥇', '1', '2', '3', '4', '5', '@', '$', '&', '*']
          FOR i IN {0}
          UNION 
              (SELECT
                  (chars)[(<std::int16>std::round((std::random() * 21)) - 1)]
              ));
      };
  };
};
