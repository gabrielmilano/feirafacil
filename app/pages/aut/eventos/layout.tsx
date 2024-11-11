
import Header from '../components/Header';
import Footer from '../components/Footer';

const CustomLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CustomLayout;
