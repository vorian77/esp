CREATE MIGRATION m17vc3rqflhmbmkhacaobhn5kxcertrj4yyw2hc7paoq2gpcomahxa
    ONTO m1fdcicll4awovtylwlemyn7oemn3jmiehp5qvxqgodywo2ae4skla
{
  ALTER TYPE org_client_moed::MoedParticipant {
      ALTER PROPERTY idxDemo {
          RESET OPTIONALITY;
      };
  };
};
