import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import fruits from "../../assets/images/fruitsv1.png";
import plan from "../../assets/images/afronutroplanning.png";
import fruity from "../../assets/images/fruits.png";
import cultural from "../../assets/images/afronutrocultural.png";
import phone from "../../assets/images/afronutromobile.png";
import CustomButton from "../common/CustomButton";
import MissionCards from "../common/MissionCard";
import ContentCard from "../common/ContentCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchEducationalContent } from "../../redux/slices/contentSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { contentList, loading, error } = useSelector((state) => state.content);
  const fetchContent = useRef(false);

  // Fetch content on mount
  useEffect(() => {
    if (!fetchContent.current) {
      dispatch(fetchEducationalContent());
      fetchContent.current = true;
    }
  }, [dispatch]);

  return (
    <div className="w-full bg-afro-light ">
      <section className="mx-4 xl:h-screen">
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center w-1/2">
            <p className="text-xs text-afro-gray">Never deny your roots</p>
            <h1 className="font-bold text-afro-brown text-2xl md:text-4xl lg:text-7xl">
              Nourish Your Roots
            </h1>
            <h1 className="text-afro-teal font-medium text-2xl md:text-4xl lg:text-7xl">
              with AfroNutro
            </h1>
            <p className=" text-xs/5 md:text-sm text-justify">
              Build towards your goals whilst maintaining your Ghanaian culture.
            </p>
            <p className=" text-xs/5 md:text-sm  text-justify">
              Have a more Ghanaian centred meal plan with your everyday
              favorites.
            </p>
            <CustomButton variant="secondary" length="cta">
              Nourish Now
            </CustomButton>
          </div>
          <div className="w-1/2 flex items-center justify-center ">
            <img src={fruits} className="w-full h-full" />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <h2 className="text-afro-brown text-center mt-2 md:pt-8 text-2xl md:text-4xl font-bold">
          HIT YOUR GOALS IN 1-2-3
        </h2>
        <div className="flex flex-col justify-center mx-4 pb-4">
          <MissionCards
            number={1}
            header={"Personalized Meal Plans"}
            plan={plan}
          >
            AfroNutro leverages advanced algorithms to create personalized meal
            plans that align with your individual preferences, dietary
            restrictions, and health goals. By considering factors such as your
            age, gender, activity level, and cultural background, AfroNutro
            ensures that your meal plans are not only nutritious but also
            enjoyable and satisfying.
          </MissionCards>
          <MissionCards
            number={2}
            header={"Cultural Sensitivity"}
            plan={cultural}
            order="secondary"
          >
            AfroNutro celebrates Ghanaian cuisine by offering a diverse range of
            recipes that cater to various tastes and preferences. Our app
            features traditional dishes, modern interpretations, and regional
            specialties, ensuring that you have access to a wide variety of
            delicious and culturally relevant meal options.
          </MissionCards>
          <MissionCards
            number={3}
            header={"Nutritional Guidance"}
            plan={fruity}
          >
            AfroNutro provides detailed nutritional information for every
            recipe, helping you make informed choices about your diet. Our app
            tracks your macronutrients, micronutrients, and calorie intake,
            allowing you to stay on top of your nutritional goals and make
            necessary adjustments.
          </MissionCards>
          <div>
            <img />
          </div>
          <div>
            <img />
          </div>
        </div>
      </section>
      <section className="mx-4 ">
        <div className="flex flex-row items-center justify-start w-full">
          <div className="flex flex-col space-y-2 w-1/2 ">
            <p className="text-afro-gray text-xs">Have 3 mins?</p>
            <h1 className="font-bold text-afro-brown  text-3xl md:text-5xl">
              <span className="text-afro-green font-extralight">Get your</span>{" "}
              personalized meal <br />
              plan
            </h1>
            <CustomButton length="cta">TAKE QUIZ</CustomButton>
          </div>
          <div
            className="mt-4 flex justify-center items-center  overflow-hidden"
            style={{ height: "80%" }}
          >
            <img src={phone} className="object-cover h-1/2" />
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="p-2">
          <h2 className="text-afro-dark text-center mt-2 md:pt-6 pb-2 text-2xl md:text-4xl font-bold ">
            Expand Your Nutrition Knowledge
          </h2>
        </div>

        <div className="mx-4 pb-2">

        {loading ? (
          <div className="grid grid-cols-3   gap-2">
            {[1, 2, 3].map((placeholder) => (
              <div
                key={placeholder}
                className="border rounded-lg p-4 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : contentList.length > 0 ? (
          <div className="grid  lg:grid-cols-3  grid-cols-1 gap-2">
          {
          contentList.slice(0, 3).map((content, index) => (
            <ContentCard
              key={index}
              title={content.title}
              img={content.content_image}
              id={content.content_id}
            >
              {content.description}
            </ContentCard>
          ))
          }
          </div>
        ) : (
          <div className="grid grid-cols-3 mx-4 p-4 gap-8">
            <ContentCard
              img={fruits}
              title="Benefits of peppers in Ghanaian dishes"
              id="fruits"
            >
              Peppers have jadfkj psbhdfos fpj h;sohfsf hwfvksgf s lsbf kjlf
              shls llhsiulfh lshf dfhl sahfl dbflsabil h dslfbi lslnfpshfb
              lksjdfb lsifbiulksjydfilsgflsgf{" "}
            </ContentCard>
            <ContentCard
              img={fruits}
              title="Benefits of peppers in Ghanaian dishes"
              id={2}
            >
              Peppers have jadfkj psbhdfos fpj h;sohfsf hwfvksgf s lsbf kjlf
              shls llhsiulfh lshf dfhl sahfl dbflsabil h dslfbi lslnfpshfb
              lksjdfb lsifbiulksjydfilsgflsgf{" "}
            </ContentCard>
            <ContentCard
              img={fruits}
              title="Benefits of peppers in Ghanaian dishes"
              id={3}
            >
              Peppers have jadfkj psbhdfos fpj h;sohfsf hwfvksgf s lsbf kjlf
              shls llhsiulfh lshf dfhl sahfl dbflsabil h dslfbi lslnfpshfb
              lksjdfb lsifbiulksjydfilsgflsgf{" "}
            </ContentCard>
          </div>
        )}
        </div>
      </section>
    </div>
  );
};

export default Home;
