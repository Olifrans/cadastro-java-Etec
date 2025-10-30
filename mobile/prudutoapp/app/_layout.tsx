// import { Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: '#3498db',
//         tabBarInactiveTintColor: '#7f8c8d',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           borderTopWidth: 1,
//           borderTopColor: '#ecf0f1',
//         },
//         headerStyle: {
//           backgroundColor: '#3498db',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Dashboard',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="speedometer" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="products"
//         options={{
//           title: 'Produtos',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="cube" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="categories"
//         options={{
//           title: 'Categorias',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="pricetags" size={size} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="reports"
//         options={{
//           title: 'Relatórios',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="bar-chart" size={size} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }





// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}