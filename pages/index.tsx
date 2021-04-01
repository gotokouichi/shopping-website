import Client, { Product } from 'shopify-buy'
import { GetStaticProps } from 'next'

type IndexProps = {
  products: Product[];
};

const client = Client.buildClient({
  domain: 'nexjs-hikoymama.myshopify.com',　//自分のストアのURLを入力する
  storefrontAccessToken: 'e4e4011cbbd8610a19a643c8cccf5537', //自分のStorefront APIのアクセストークンを入力する
});

const IndexPage: React.FC<IndexProps> = ({ products }) => {
  return (
    <>
      <h1>Hello Next.js 👋</h1>
      <ul>
        {
          products.map((product) => 
          <li key={product.id}>
            {product.title}
            <img src={product.images[0].src} height={80}/>
          </li>)
        }
      </ul>
    </>
  );
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const products: any = await client.product.fetchAll();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};