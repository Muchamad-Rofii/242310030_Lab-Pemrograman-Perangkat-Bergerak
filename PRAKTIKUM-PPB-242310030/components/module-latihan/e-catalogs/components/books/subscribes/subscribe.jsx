import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ListBook } from "../../../../../constants/list_books";
import { color_list } from "../../../styles/StyleApps";
import { style_detail } from "../../../styles/StyleDetail";
import BottomSheetModal from "../../BottomSheetModal";
import { ButtonPill } from "../../buttons";

export default function Subscribe() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));

  const handleSubscribe = () => {
    console.log("Subscribe to book:", id);
    router.push(`/books/read/${id}`);
  };

  return (
    <BottomSheetModal>
      <View style={style_detail.container}>
        <View style={style_detail.content}>
          <Text style={style_detail.title}>Subscribe to Read</Text>
          <Text style={style_detail.bookTitle}>{book?.title}</Text>
          <Text style={style_detail.description}>
            Subscribe to unlock this premium book and access thousands of other
            titles.
          </Text>

          <View style={style_detail.priceContainer}>
            <Text style={style_detail.price}>IDR 35.000/month</Text>
            <Text style={style_detail.priceDesc}>Cancel anytime</Text>
          </View>

          <View style={{ gap: 20 }}>
            <ButtonPill onAction={handleSubscribe} color={color_list.orange}>
              <Text style={style_detail.subscribeButtonText}>
                Subscribe Now
              </Text>
            </ButtonPill>

            <ButtonPill onAction={() => router.back()} color={color_list.cream}>
              <Text style={style_detail.backButtonText}>Go Back</Text>
            </ButtonPill>
          </View>
        </View>
      </View>
    </BottomSheetModal>
  );
}
