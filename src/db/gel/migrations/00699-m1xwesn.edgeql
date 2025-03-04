CREATE MIGRATION m1xwesnkph6ts4cpn5i5a2ptcrzphxwdum23ymuzerllqe3fz7vuzq
    ONTO m1ucogndxywflzpzec2dpwvduhahpi2nvd66jk2ojyroybxc7scyfq
{
              ALTER TYPE app_cm::CmCsfDocument {
      ALTER LINK staffAgency {
          RESET OPTIONALITY;
      };
  };
};
