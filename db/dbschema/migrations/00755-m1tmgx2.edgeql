CREATE MIGRATION m1tmgx255drou5rkpwxaryccsvbvbrfhydjliqxjwsj4nvlnj4mdgq
    ONTO m12ay5p3g4bzsbuhpwhk7ehqovoyqut7lhvxfeqdq3anvo56bv2suq
{
  ALTER TYPE sys_core::SysOrg {
      ALTER PROPERTY logoMarginRight {
          SET TYPE std::float64;
      };
      ALTER PROPERTY logoWidth {
          SET TYPE std::int16 USING (<std::int16>.logoWidth);
      };
  };
};
